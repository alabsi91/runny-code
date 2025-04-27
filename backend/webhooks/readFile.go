package webhooks

import (
	"runny-code/common"
	"encoding/json"
	"os"
)

func ReadFile() (entries []WebhookEntry, err error) {
	file, err := os.Open(common.WebhooksFile)
	if err != nil {
		return
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&entries)
	if err != nil {
		return
	}

	return
}