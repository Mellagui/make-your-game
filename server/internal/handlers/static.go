package handlers

import (
	"net/http"
	dir "make-your-game/server/internal/models";
)

func HandleStatic() {
	fs := http.FileServer(http.Dir(dir.StaticPath))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
}


