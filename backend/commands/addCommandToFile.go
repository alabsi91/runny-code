package commands

import (
	"fmt"
	"os"
	"strings"
)

type AddCommandInput struct {
	CommandName string `json:"commandName"`
	GroupName   string `json:"groupName"`
	Description string `json:"description"`
	Command     string `json:"command"`
}

func AddCommandToFile(filePath string, commandInput AddCommandInput) error {
	file, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	commandStr := constructCommandLine(commandInput)

	fileStr := string(file)
	fileStr = strings.TrimRight(fileStr, " \n")
	fileStr = fmt.Sprintf("%s\n\n%s", fileStr, commandStr)

	err = os.WriteFile(filePath, []byte(fileStr), 0644)
	if err != nil {
		return err
	}

	return nil
}

func constructCommandLine(commandInput AddCommandInput) string {
	nameLn := fmt.Sprintf("@name %s\n", commandInput.CommandName)

	groupNameLn := ""
	if commandInput.GroupName != "" {
		groupNameLn = fmt.Sprintf("@group %s\n", commandInput.GroupName)
	}

	descriptionLn := ""
	if commandInput.Description != "" {
		descriptionLn = fmt.Sprintf("@description %s\n", commandInput.Description)
	}

	return fmt.Sprintf("%s%s%s%s", nameLn, groupNameLn, descriptionLn, commandInput.Command)
}
