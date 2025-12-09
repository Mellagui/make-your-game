package models

import "sync"

const (
	StaticPath    = "client/static/"
	TemplatesPath = "./client/"
)

var Mu sync.Mutex

type Data struct {
	Scores []PlayerScore
	Page   Pagination
}

type PlayerScore struct {
	Rank  string `json:"rank"`
	Name  string `json:"name"`
	Time  string `json:"time"` // type time //
	Score int    `json:"score"`
}

type Pagination struct {
	Current int
	Max     int
}

type Message struct {
	Name  string
	Rank  string
	Ratio int
}

type ErrorJson struct {
	Status  int
	Message string
	Error   string
}
