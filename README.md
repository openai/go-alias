Use this service to quickly alias and redirect to long URLs [(demo)](https://gonode-demo.herokuapp.com)

## Setup
### Server setup
Recommended to use Heroku to host the service if you don't care about security. Should take about 5 minutes to stand up. Otherwise you can put it on a Kubernetes cluster.
1. Create a Firebase project
1. Export Firebase creds on your [Firebase service account](https://console.developers.google.com/iam-admin/serviceaccounts/) as a json file
1. Create a new Heroku app and connect it to this git repo or your fork of it
1. Make json file's creds available as environment variables in your deployment environment (eg. through Heroku dashboard)
    * `FIREBASE_PROJECT_ID`
    * `FIREBASE_CLIENT_EMAIL`
    * `FIREBASE_DATABASE_NAME`
    * `FIREBASE_PRIVATE_KEY` which can have literal `\n` instead of actual newlines
1. Deploy!

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
