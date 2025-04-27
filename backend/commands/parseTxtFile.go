package commands

import (
	"bufio"
	"os"
	"regexp"
	"strings"
)


var NameDirectiveRe = regexp.MustCompile(`^\s*(?:@name)(.*)$`)
var GroupDirectiveRe = regexp.MustCompile(`^\s*(?:@group)(.*)$`)
var DescDirectiveRe = regexp.MustCompile(`^\s*(?:@description|@desc)(.*)$`)

func parseCommandsFile(filePath string) (commands []ParsedCommand, err error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	commands = []ParsedCommand{}

	// Read the file line by line
	scanner := bufio.NewScanner(file)
	previousLines := []string{}
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		// Skip empty, comments and directives lines
		if line == "" || strings.HasPrefix(line, "#") || strings.HasPrefix(line, "@") {
			previousLines = append(previousLines, line)
			continue
		}

		name := ""
		group := ""
		description := ""

		// loop backwards over previous lines to find directives
		for i := len(previousLines) - 1; i >= 0; i-- {
			previousLine := previousLines[i]

			// Stop on first empty or comment line
			if previousLine == "" || strings.HasPrefix(previousLine, "#") {
				break
			}

			matchName := NameDirectiveRe.FindStringSubmatch(previousLine)
			if len(matchName) > 0 {
				name = strings.TrimSpace(matchName[1])
				continue
			}
			matchGroup := GroupDirectiveRe.FindStringSubmatch(previousLine)
			if len(matchGroup) > 0 {
				group = strings.TrimSpace(matchGroup[1])
				continue
			}
			matchDesc := DescDirectiveRe.FindStringSubmatch(previousLine)
			if len(matchDesc) > 0 {
				description = strings.TrimSpace(matchDesc[1])
				continue
			}
		}

		commands = append(commands, ParsedCommand{Command: line, Name: name, Group: group, Description: description})
	}

	// Check for errors during scanning
	if err = scanner.Err(); err != nil {
		return nil, err
	}

	return commands, nil
}
