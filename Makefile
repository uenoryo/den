deploy:
	ansible-playbook -i ./ansible/inventory/app.ini ./ansible/playbook/den-web.yml --private-key=~/.ssh/den-web.pem

update-nginx:
	ansible-playbook -i ./ansible/inventory/app.ini ./ansible/playbook/den-web-nginx.yml --private-key=~/.ssh/den-web.pem --ask-become-pass
