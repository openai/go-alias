Use this service to easily visit long, complicated URLs.

## Setup
### Server setup
1. Create a Firebase project
1. Export Firebase creds, create a secret in the format expected by `kube/api-deployment.yaml` or make them available as environment variables in your deployment environment
1. Deploy on Kubernetes using the files in `kube/` or the platform of your choice
1. Set up domain if you don't get one for free through your deployment platform

### Client setup
Add this site to your <a href="chrome://settings/searchEngines">Chrome search engines</a> by scrolling down until you see three empty boxes. Enter values <b>go</b>, <b>go</b>, and <b>go.corp.mycompany.com/%s</b>, respectively.

### Advanced setup
To get the most benefit from the service, you should setup a DNS entry
on your local network, `go.corp.mycompany.com`. Make sure that
`corp.mycompany.com` is in the search domains for each user on the
network. This is usually easily accomplished by configuring your DHCP
server. Now, simply typing `go` into your browser should take you to
the service, where you can register shortcuts. Those
shortcuts will also be available by typing `go/shortcut`.

On a mac, you can add the domain to your DNS search paths
```
networksetup -setsearchdomains Wi-Fi corp.example.com
```
However, this will require all bare names to hang instead of failing instantly, so you may wish to stick with the Chrome-only solution.

## Use
When you type in the Chrome URL bar <b>go&lt;TAB&gt;</b> anything you type afterwards will bring you to that alias here.
You can then paste your link in the box and the next time you visit this alias, it will bring you straight to the site you pasted before.

You can override any alias by visiting eg., #{path}/myalias/mynewsite.com

## Develop
Export your firebase credentials as appropriate environment variables. You'll need:
* `FIREBASE_PROJECT_ID`
* `FIREBASE_CLIENT_EMAIL`
* `FIREBASE_DATABASE_NAME`
* `FIREBASE_PRIVATE_KEY` which can have literal `\n` instead of actual newlines

```
npm install
npm install -g devtool
npm run dev
```

Visit http://localhost:3000/myalias

## Test in docker
```
make run
```

## Deploy
```
kubectl apply -f kube/api-deployment.yaml
kubectl apply -f kube/api-svc.yaml
```
