package main

import (
	"log"
	"net/http"
	handlers "make-your-game/server/internal/handlers"
)

func main() {
	handlers.HandleStatic();

	http.HandleFunc("/", handlers.Home)
	http.HandleFunc("/get_scores", handlers.GetScores)
	http.HandleFunc("/set_scores", handlers.SetScores)

	log.Println("Server Start: http://localhost:8080/")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Server can't started")
	}
}
