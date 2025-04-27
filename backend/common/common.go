package common

import (
	"crypto/rand"
	"encoding/base64"
	"os"
	"slices"
	"strings"
)

const FilesDir = "../files" // Dont use abs path it will break everything
const StaticDir = "../webui/dist"
const CommandsFile = "../config/commands.txt"
const WebhooksFile = "../config/webhooks.json"

var App_ENV = os.Getenv("APP_ENV") // development | production

var Allow_Command_Manipulation_Env = os.Getenv("ALLOW_COMMAND_MANIPULATION")

var Include_Patterns_Env = strings.Split(os.Getenv("INCLUDED_PATTERNS"), " | ")
var Exclude_Patterns_Env = strings.Split(os.Getenv("EXCLUDED_PATTERNS"), " | ")

var Username_Env = os.Getenv("AUTH_USERNAME")
var Password_Env = os.Getenv("AUTH_PASSWORD")

var SSH_User_Env = os.Getenv("SSH_USERNAME")
var SSH_Password_Env = os.Getenv("SSH_PASSWORD")
var SSH_Host_Env = os.Getenv("SSH_HOST")
var SSH_Port_Env = os.Getenv("SSH_PORT")

var Port = os.Getenv("PORT")
var Webhook_Port = os.Getenv("WEBHOOK_PORT")
var Domain_Env = os.Getenv("DOMAIN")
var Webhook_Route_Env = os.Getenv("WEBHOOK_ROUTE")

var SessionToken = generateToken(32)

func InitDefaults() {
	Include_Patterns_Env = slices.DeleteFunc(Include_Patterns_Env, func(s string) bool { return s == "" })
	Exclude_Patterns_Env = slices.DeleteFunc(Exclude_Patterns_Env, func(s string) bool { return s == "" })

	if App_ENV == "" {
		App_ENV = "production"
	}
	if Allow_Command_Manipulation_Env == "" {
		Allow_Command_Manipulation_Env = "true"
	}
	if len(Include_Patterns_Env) == 0 {
		Include_Patterns_Env = append(Include_Patterns_Env, "**/*")
	}
	if len(Exclude_Patterns_Env) == 0 {
		Exclude_Patterns_Env = append(Exclude_Patterns_Env, "**/*.")
	}
	if Username_Env == "" {
		Username_Env = "admin"
	}
	if Password_Env == "" {
		Password_Env = "admin"
	}
	if SSH_Port_Env == "" {
		SSH_Port_Env = "22"
	}
	if Port == "" {
		Port = "8080"
	}
	if Webhook_Port == "" {
		Webhook_Port = Port
	}
	if Domain_Env == "" {
		Domain_Env = "http://127.0.0.1" + ":" + Webhook_Port
	}
	if Webhook_Route_Env == "" {
		Webhook_Route_Env = "/webhook"
	}
	if App_ENV == "development" {
		SessionToken = "6iKzMBufuKoscBln5mXhcf3p20KMdukI0G234y_DhcE="
	}
}

func generateToken(length int) string {
	// Create a byte slice of the desired length
	tokenBytes := make([]byte, length)
	_, err := rand.Read(tokenBytes)
	if err != nil {
		return "Raldjlajfdajfdljasldfjjlk"
	}

	return base64.URLEncoding.EncodeToString(tokenBytes)
}
