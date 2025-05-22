package api

import (
	"net/http"
	apiAuth "runny-code/api/auth"
	apiCommands "runny-code/api/commands"
	apiFiles "runny-code/api/files"
	apiMiddleware "runny-code/api/middleware"
	apiWebhooks "runny-code/api/webhooks"
	"runny-code/common"
)

func InitServer() error {
	mux := http.NewServeMux()

	// Serve web interface
	fs := http.FileServer(http.Dir(common.StaticDir))
	mux.Handle("/", fs)

	mux.HandleFunc("POST /login", apiAuth.LoginHandle)
	mux.HandleFunc("GET /logout", apiAuth.LogoutHandle)
	mux.HandleFunc("GET /is-authenticated", apiAuth.IsAuthenticatedHandle)

	mux.HandleFunc("GET /read-dir/", apiFiles.ReadDirHandle)
	mux.HandleFunc("GET /file/", apiFiles.ReadFileHandle)
	mux.HandleFunc("PUT /file/", apiFiles.WriteFileHandle)
	mux.HandleFunc("POST /move-path/", apiFiles.MoveToPathHandle)
	mux.HandleFunc("DELETE /delete-path/", apiFiles.DeletePathHandle)
	mux.HandleFunc("PUT /create-folder/", apiFiles.CreateFolderHandle)
	mux.HandleFunc("PUT /create-file/", apiFiles.CreateFileHandle)
	mux.HandleFunc("POST /upload-files/", apiFiles.UploadHandle)
	mux.HandleFunc("GET /download-path/", apiFiles.DownloadHandle)

	mux.HandleFunc("GET /command/", apiCommands.GetCommandsListHandle)
	mux.HandleFunc("POST /command/", apiCommands.ExecuteCommandHandle)
	mux.HandleFunc("PUT /command/", apiCommands.AddCommandHandle)
	mux.HandleFunc("DELETE /command/", apiCommands.DeleteCommandHandle)
	mux.HandleFunc("GET /is-command-manipulation-allowed", apiCommands.IsManipulationAllowedHandle)

	mux.HandleFunc("PUT /create-webhook/", apiWebhooks.CreateForCommand)
	mux.HandleFunc("PUT /update-webhook/", apiWebhooks.UpdateForCommand)
	mux.HandleFunc("DELETE /delete-webhook/", apiWebhooks.DeleteForCommand)
	mux.HandleFunc("GET /get-webhook/", apiWebhooks.GetForCommand)

	webhooksRout := "GET " + common.Webhook_Route_Env + "/{uuid}/"
	if common.Port != common.Webhook_Port {
		go startWebhookServer(webhooksRout)
	} else {
		mux.HandleFunc(webhooksRout, apiWebhooks.HandleMessages)
	}

	err := http.ListenAndServe(":"+common.Port, apiMiddleware.Controller(mux))
	if err != nil {
		return err
	}

	return nil
}

func startWebhookServer(route string) {
	mux := http.NewServeMux()
	mux.HandleFunc(route, apiWebhooks.HandleMessages)
	err := http.ListenAndServe(":"+common.Webhook_Port, apiMiddleware.CorsMiddleware(mux))
	if err != nil {
		panic(err)
	}
}
