package webhooks

import (
	"runny-code/common"
	"fmt"
	"net/url"
)

func ConstructUrl(uuid string) string {
	res, err := url.JoinPath(common.Domain_Env, common.Webhook_Route_Env, uuid)
	if err == nil {
		return res
	}

	return fmt.Sprintf("%s%s/%s", common.Domain_Env, common.Webhook_Route_Env, uuid)
}
