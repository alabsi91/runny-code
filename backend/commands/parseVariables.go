package commands

import (
	"slices"
	"strings"
)

// ParseVariables parses a command string and returns a list of ParsedVariables
func ParseVariables(input string) []ParsedVariable {
	matches := valuesRe.FindAllStringSubmatch(input, -1)

	variables := []ParsedVariable{}

	groupNames := valuesRe.SubexpNames()

	for _, match := range matches {
		variable := ParsedVariable{Values: []string{}}

		for i, group := range match {
			name := groupNames[i]
			switch name {
			case "name":
				variable.Name = group
			case "optional":
				variable.Optional = group == "?"
			case "default":
				variable.Default = group
			case "type":
				variable.Type = verifyType(group)
			case "values":
				variable.Values, variable.Restricted = handleValues(group)
			}
		}

		variables = append(variables, variable)
	}

	return variables
}

// verifyType processes and validates types
func verifyType(t string) string {
	if slices.Contains(validTypes, t) {
		return t
	}
	return ""
}

// handleValues processes values and sets restricted or default flags
func handleValues(values string) ([]string, bool) {
	valuesList := removeDuplicates(strings.Split(values, "|"))
	valuesList = slices.DeleteFunc(valuesList, func(s string) bool {
		return s == ""
	})

	restricted := len(valuesList) > 0 && !slices.Contains(valuesList, "*") // "*" removes restriction

	return valuesList, restricted
}
