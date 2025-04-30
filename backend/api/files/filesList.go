package apiFiles

import (
	"encoding/json"
	"net/http"
	"runny-code/common"
)

func ReadDirHandle(w http.ResponseWriter, r *http.Request) {
	rootFolder, err := readFiles(common.FilesDir)
	if err != nil {
		http.Error(w, "Error reading the files directory", http.StatusInternalServerError)
		return
	}

	// remove the leading `FilesDir` from each path
	rootFolder.RemoveLeading(common.FilesDir)

	bytes, err := json.Marshal(rootFolder)
	if err != nil {
		http.Error(w, "Error encoding the folders to json", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}
