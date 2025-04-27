package commands

import (
	"fmt"
	"strings"
)

// FillCommand replaces placeholders with values and validates input
func FillCommand(cmd string, variables []ParsedVariable, argsMap map[string]string) (string, error) {
	matches := PlaceholderRe.FindAllStringSubmatch(cmd, -1)

	newCmd := cmd
	for _, match := range matches {
		placeholder := match[0]
		argName := match[1]

		variable := findVariable(&variables, argName)
		if variable == nil {
			return "", fmt.Errorf(`argument "%s" is not defined`, argName)
		}

		argValue, ok := argsMap[argName]
		if !ok {
			argValue = variable.Default
		}

		isValid, err := variable.Validate(argValue)
		if err != nil {
			return "", err
		}

		if !isValid {
			return "", fmt.Errorf(`argument "%s" has invalid value "%s"`, argName, argValue)
		}

		replacement := wrapInQuotes(argValue)

		newCmd = strings.ReplaceAll(newCmd, placeholder, replacement)
	}

	return newCmd, nil
}
