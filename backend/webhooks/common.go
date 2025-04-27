package webhooks

import ("github.com/google/uuid")

type WebhookEntry struct {
	CommandName string `json:"CommandName"`
	Command     string `json:"command"`
	UUID        string `json:"uuid"`
}

var WebhookEntries []WebhookEntry

func generateUUID() string {
	return uuid.New().String()
}