.PHONY: clean install-node10 install install-api install-frontend up up-api up-frontend

install-node10:
	curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -;
	sudo apt install nodejs

clean:
	rm -rf api/dist;
	rm -rf api/node_modules;
	rm -rf frontend/dist;
	rm -rf frontend/node_modules;

install: clean install-api install-frontend

install-api:
	cp api/.env-dev api/.env;
	cd api && npm install;

install-frontend:
	cp frontend/.env-dev frontend/.env;
	cd frontend && npm install;

up-api:
	cd api && npm run build && node dist/web.js;

up-frontend:
	cd frontend && npm run build && npm run serve;