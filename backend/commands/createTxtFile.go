package commands

import "os"

func CreateCommandsTxtFile(filePath string) error {
	exists, err := fileExists(filePath)
	if err != nil {
		return err
	}

	// file already exists
	if exists {
		return nil
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	content := `
# Commands to run on remote server

# Syntax:
# @name <command name (Unique and required)>
# @group <group name (Optional)>
# @desc <command description (Optional)>
# <command ...${variable}>

# - The directive must be on one line.
# - Use only one unique directive per command.
# - No empty lines or comments between directives and the command.

# Command's variables:
# ${name}               - A required variable of 'any' type with no default or restricted values.
# ${Name?}              - An optional variable.
# ${Name:int}           - Specifies the value type. Defaults to 'any'.
# ${Name=John}          - A default value that should match the specified value type.
# ${Name[John|Sara]}    - Accepts only the listed values, matching the value type.
# ${Name[John|Sara|*]}  - Provides auto-completion and allows manual entry of values matching the value type.

# Value types:
# "any"            - Anything (default)
# "int"            - Numbers with no decimals
# "float"          - Only numbers with decimals
# "number"         - Numbers with decimal or integer values
# "non-numeric"    - Strings with no numbers
# "boolean"        - true or false
# "password"       - Strings with no spaces
# "url"            - A web URL
# "path"           - Matches a clean path
# "flag"           - Command line flag (e.g., -a or -la)
# "option"         - Command line option (e.g., --option or --option-name)

# Examples:
@name List Files
@group Files & Directories
@description List files in a directory
ls ${Path:path=/home}

@name echo
@group Utils
@description Echo a message
echo ${Message=Hello World}

@name Random 32 hex characters
@group Utils
@description Generate random 32 hex password
openssl rand -hex 16
`
	_, err = file.WriteString(content)
	if err != nil {
		return err
	}

	return nil
}
