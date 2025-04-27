package commands

import (
	"net/url"
	"path"
	"regexp"
	"strings"
)

func validateType(value, t string) bool {
	if t == "any" {
		return true
	}

	if t == "int" {
		re := regexp.MustCompile(`^\d+$`)
		return re.MatchString(value)
	}

	if t == "float" {
		re := regexp.MustCompile(`^\d+\.\d+$`)
		return re.MatchString(value)
	}

	if t == "number" {
		re := regexp.MustCompile(`^\d+(?:\.\d+)?$`)
		return re.MatchString(value)
	}

	if t == "boolean" {
		lowercaseVal := strings.ToLower(value)
		return lowercaseVal == "true" || lowercaseVal == "false"
	}

	if t == "non-numeric" {
		re := regexp.MustCompile(`\d+(?:\.\d+)?`)
		return !re.MatchString(value)
	}

	if t == "path" {
		validPath := path.Clean(value)
		return validPath == value
	}

	if t == "password" {
		return !strings.Contains(value, " ")
	}

	if t == "flag" {
		re := regexp.MustCompile(`^-[a-zA-Z]+$`)
		return re.MatchString(value)
	}

	if t == "option" {
		re := regexp.MustCompile(`^--[a-zA-Z-]+$`)
		return re.MatchString(value)
	}

	if t == "url" {
		_, err := url.ParseRequestURI(value)
		return err == nil
	}

	return true
}
