package apiCommands

import (
	"fmt"
	"net/http"
	"runny-code/commands"
	"runny-code/common"
)

func AddCommandHandle(w http.ResponseWriter, r *http.Request) {
	if common.Allow_Command_Manipulation_Env != "true" {
		http.Error(w, "Unauthorized: Command manipulation is disabled", http.StatusUnauthorized)
		return
	}

	commandName := r.FormValue("commandName")
	groupName := r.FormValue("groupName")
	description := r.FormValue("description")
	command := r.FormValue("command")

	if commandName == "" {
		http.Error(w, "Missing command name parameter", http.StatusBadRequest)
		return
	}

	if command == "" {
		http.Error(w, "Missing command parameter", http.StatusBadRequest)
		return
	}

	foundCommand := commands.FindCommand(commands.ParsedCommandsList, commandName)
	if foundCommand != nil {
		http.Error(w, fmt.Sprintf("Command '%s' already exists", commandName), http.StatusBadRequest)
		return
	}

	addCommandInput := commands.AddCommandInput{
		CommandName: commandName,
		GroupName:   groupName,
		Description: description,
		Command:     command,
	}

	err := commands.AddCommandToFile(common.CommandsFile, addCommandInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// update the commands list after adding the new command
	commandsList, err := commands.ParseCommands(common.CommandsFile)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	commands.ParsedCommandsList = commandsList

	w.Write([]byte("Command added successfully"))
}
