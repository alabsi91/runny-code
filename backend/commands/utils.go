package commands

import (
	"fmt"
	"os"
	"regexp"
	"unicode"
)

var unescapedDoubleQuotesRe = regexp.MustCompile(`(^|[^\\])(\\\\)*(")`)
var unescapedSingleQuotesRe = regexp.MustCompile(`(^|[^\\])(\\\\)*'`)

func fileExists(filePath string) (bool, error) {
	_, err := os.Stat(filePath)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

// removeDuplicates removes duplicate entries from a slice
func removeDuplicates(slice []string) []string {
	seen := make(map[string]struct{})
	var unique []string
	for _, s := range slice {
		if _, ok := seen[s]; !ok {
			seen[s] = struct{}{}
			unique = append(unique, s)
		}
	}
	return unique
}

func FindCommand(commands []ParsedCommand, name string) *ParsedCommand {
	for _, command := range commands {
		if command.Name == name {
			return &command
		}
	}
	return nil
}

func findVariable(variables *[]ParsedVariable, name string) *ParsedVariable {
	for _, variable := range *variables {
		if variable.Name == name {
			return &variable
		}
	}
	return nil
}

// Function to check for any whitespace, including visible spaces
func containsSpaces(input string) bool {
	for _, r := range input {
		if unicode.IsSpace(r) {
			return true
		}
	}
	return false
}

func containsUnescapedDoubleQuotes(str string) bool {
	matches := unescapedDoubleQuotesRe.FindAllString(str, -1)
	return len(matches) > 0
}

func containsUnescapedSingleQuotes(str string) bool {
	matches := unescapedSingleQuotesRe.FindAllString(str, -1)
	return len(matches) > 0
}

// Function to wrap a string in quotes if it contains spaces
// It will decide whether to use double or single quotes depending on the string content
// And try to escape any existing quotes
func wrapInQuotes(str string) string {

	str = regexp.MustCompile(`(["'])+`).ReplaceAllString(str, `$1`) // remove repeated quotes

	// No need for wrapping
	if !containsSpaces(str) {
		return str
	}

	// it's safe to wrap with double quotes
	if !containsUnescapedDoubleQuotes(str) {
		return fmt.Sprintf(`"%s"`, str)
	}

	// it's safe to wrap with single quotes
	if !containsUnescapedSingleQuotes(str) {
		return fmt.Sprintf(`'%s'`, str)
	}

	// Wrap with double quotes and escape any existing unescaped ones
	escapedDoubleQuotesStr := unescapedDoubleQuotesRe.ReplaceAllString(str, `$1\$3`)
	return fmt.Sprintf(`"%s"`, escapedDoubleQuotesStr)
}
