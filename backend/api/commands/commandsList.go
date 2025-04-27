package apiCommands

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runny-code/commands"
)

func GetCommandsListHandle(w http.ResponseWriter, r *http.Request) {
	commandsListByte, err := json.Marshal(commands.ParsedCommandsList)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to json marshal commands list: %s", err.Error()), http.StatusInternalServerError)
	}

	w.Write(commandsListByte)
}
