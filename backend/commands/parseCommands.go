package commands

func ParseCommands(filePath string) ([]ParsedCommand, error) {
	parsedCommandsList, err := parseCommandsFile(filePath)
	if err != nil {
		return nil, err
	}

	commandsArr := []ParsedCommand{}
	for _, parsedCommand := range parsedCommandsList {
		parsedCommand.Variables = ParseVariables(parsedCommand.Command)
		commandsArr = append(commandsArr, parsedCommand)
	}

	return commandsArr, nil
}
