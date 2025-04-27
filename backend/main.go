package main

import (
	"runny-code/api"
	"runny-code/commands"
	"runny-code/common"
	"runny-code/webhooks"
)

func main() {
	// init defaults
	common.InitDefaults()

	// create commands file
	err := commands.CreateCommandsTxtFile(common.CommandsFile)
	if err != nil {
		panic(err)
	}

	// create webhooks file
	err = webhooks.CreateFile()
	if err != nil {
		panic(err)
	}

	// parse commands and store them
	commandsList, err := commands.ParseCommands(common.CommandsFile)
	if err != nil {
		panic(err)
	}
	commands.ParsedCommandsList = commandsList

	// parse webhooks and store them
	webhooksList, err := webhooks.ReadFile()
	if err != nil {
		panic(err)
	}
	webhooks.WebhookEntries = webhooksList

	err = api.InitServer()
	if err != nil {
		panic(err)
	}
}
