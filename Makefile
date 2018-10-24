deploy-web:
	ansible-playbook -i ./ansible/inventory/app.ini ./ansible/playbook/den-web.yml --private-key=~/.ssh/den-web.pem

deploy-api:
	ansible-playbook -i ./ansible/inventory/app.ini ./ansible/playbook/den-api.yml --private-key=~/.ssh/den-web.pem --ask-become-pass

update-nginx:
	ansible-playbook -i ./ansible/inventory/app.ini ./ansible/playbook/den-web-nginx.yml --private-key=~/.ssh/den-web.pem --ask-become-pass

update-database:
	ansible-playbook -i ./ansible/inventory/app.ini ./ansible/playbook/database.yml --private-key=~/.ssh/den-web.pem --ask-become-pass
