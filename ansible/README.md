# デプロイ方法

#### 事前にansibleをインストールしておきます

```sh
$ brew install ansible
```

#### 以下のコマンドを実行します

```sh
$ cd den/ansible
$ ansible-playbook -i ./inventory/app.ini ./playbook/den-web.yml --private-key=~/.ssh/den-web.pem --ask-become-pass

> SUDO password:
> [パスワード]

```
