package apiFiles

import (
	"fmt"
	"net/http"
	"path"
	"runny-code/common"
)

func MoveToPathHandle(w http.ResponseWriter, r *http.Request) {
	fromPath := r.URL.Query().Get("fromPath")
	toPath := r.URL.Query().Get("toPath")
	if fromPath == "" {
		http.Error(w, "Missing from path parameter", http.StatusBadRequest)
		return
	}
	if toPath == "" {
		http.Error(w, "Missing to path parameter", http.StatusBadRequest)
		return
	}

	fromPath = path.Join(common.FilesDir, fromPath)
	toPath = path.Join(common.FilesDir, toPath)

	err := moveToPath(fromPath, toPath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	warning := ""
	if isExcluded(toPath) {
		warning = "The path has been moved but is excluded; you will not be able to access it."
	}
	if !isIncluded(toPath) {
		warning = "The path has been moved but is not included; you will not be able to access it."
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(fmt.Appendf(nil, `{"warning": "%s"}`, warning))
}
