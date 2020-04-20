.PHONY: clean install install-api install-frontend up up-api up-frontend

clean:
	rm -rf api/dist;
	rm -rf api/node_modules;
	rm -rf frontend/dist;
	rm -rf frontend/node_modules;

install: clean install-api install-frontend

install-api:
	cd api && npm install;

install-frontend:
	cd frontend && npm install;

up-api:
	cd api && npm run build && node dist/web.js;

up-frontend:
	cd frontend && npm run build && npm run serve;