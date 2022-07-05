SESSION="tad"
SESSION_EXISTS := $(shell tmux list-sessions 2>/dev/null | grep -q ^${SESSION}; echo $$?)

dev:
ifeq (0,${SESSION_EXISTS})
	$(info "Dev session already started; attaching")
	tmux attach-session -t ${SESSION}
else
	$(info "Creating new tmux dev session")
	tmux new-session -d -s ${SESSION}
	tmux rename-window -t ${SESSION}:1 'redis'
	tmux send-keys -t 'redis' 'cd data && ./run-redis.sh' C-m
	tmux new-window -n 'mongo'
	tmux send-keys -t 'mongo' 'cd data && make mongo' C-m
	tmux new-window -n 'celery'
	tmux send-keys -t 'celery' 'cd back && source venv/bin/activate && make dev' C-m
	tmux new-window -n 'sveltekit'
	tmux send-keys -t 'sveltekit' 'cd front && npm run dev' C-m
	tmux new-window -n 'develop'
	tmux attach-session -t ${SESSION}
endif
