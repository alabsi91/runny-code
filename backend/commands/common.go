package commands

import (
	"fmt"
	"regexp"
	"slices"
)

// Predefined valid types for validation
var validTypes = []string{
	"int",         // no decimals
	"float",       // with decimals
	"number",      // decimal or integer
	"non-numeric", // no numbers or floats
	"any",         // anything (default)
	"boolean",     // true or false
	"password",    // no spaces
	"url",         // a web URL
	"path",        // a clean path
	"flag",        // -a or -la
	"option",      // --option or --option-name
}

// ParsedVariable struct now includes the `Types` field
type ParsedVariable struct {
	Name       string   `json:"name"`
	Optional   bool     `json:"optional"`
	Type       string   `json:"type"`
	Values     []string `json:"values"`
	Restricted bool     `json:"restricted"`
	Default    string   `json:"default"`
}

type ParsedCommand struct {
	Name        string           `json:"name"`
	Group       string           `json:"group"`
	Description string           `json:"description"`
	Command     string           `json:"command"`
	Variables   []ParsedVariable `json:"variables"`
}

func (p *ParsedVariable) Validate(value string) (bool, error) {
	// no value
	if value == "" {
		if !p.Optional {
			return false, fmt.Errorf(`variable "%s" is required`, p.Name)
		}
		return true, nil
	}

	// check if value matches the type
	if len(p.Type) > 0 {
		if isTypeValid := validateType(value, p.Type); !isTypeValid {
			return false, fmt.Errorf(`variable "%s" of type "%s" has invalid value "%s"`, p.Name, p.Type, value)
		}
		return true, nil
	}

	// only predefined values are allowed
	if p.Restricted {
		if !slices.Contains(p.Values, value) {
			return false, fmt.Errorf(`variable "%s" has invalid value "%s"`, p.Name, value)
		}
		return true, nil
	}

	// any type and not restricted
	if len(p.Type) == 0 && !p.Restricted {
		return true, nil
	}

	return false, fmt.Errorf(`failed to validate the variable "%s" with the value "%s"`, p.Name, value)
}

var valuesRe = regexp.MustCompile(`\$\{(?:(?P<name>.+?)[:=]?)(?P<optional>\?)?(?::(?P<type>.+?)=?)?(?:=(?P<default>.+?))?(?:\[(?P<values>.+?)\])?\}`)
var PlaceholderRe = regexp.MustCompile(`\$\{(?P<name>.+?)(?:[?:=\[].+?)?\}`)
var ParsedCommandsList []ParsedCommand
