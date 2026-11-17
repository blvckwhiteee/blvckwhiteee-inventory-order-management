check:
	npm run lint
	npm run build
	npm run test

version:
	@echo "Git SHA (App Version): $$(git rev-parse HEAD)"