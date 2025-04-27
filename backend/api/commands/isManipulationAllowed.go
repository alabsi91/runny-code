package apiCommands

import (
	"net/http"
	"runny-code/common"
)

func IsManipulationAllowedHandle(w http.ResponseWriter, r *http.Request) {
	if common.Allow_Command_Manipulation_Env == "true" {
		w.Write([]byte("true"))
	} else {
		w.Write([]byte("false"))
	}
}
