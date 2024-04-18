// Videos to watch:

// 1. Github CI/CD
// 2 Frontend deployments
// 3. Nextjs
// 4. Auth(NextAuth, Auth0)
// 5. Docker
// 6. GraphQL

// GITHUB CI/CD NOTES

// 1. Importamt Port 443/80 -  443 is by default port for  https and 80 is by deafault port
// for http sites
// eg https://google.com:443 = https://google.com ,http://google.com:80 = http://google.com

// 2 AWS EC2 has inbound rules(ports which users can hit on the site and only ssh port 22 is
// initialy open so owner can connect to instance by ssh, open 80 and 443 port for users) and
// outbound rules(website can access what sites or can websites can access internet and this is
//     almost always open tio internet)

// 3. ssh cmd : ssh -i keyPair file ubuntu@<ec2_machine_public_url> and give permisison yes
//  to add host to known_hosts and chmod 600 keypair file if keypair has open permissions

// 4. now clone code to server after ssh and install node suing nvm in server code and then do
// npm install to install server ciode dependencies

// 5. Add process managers pm2 to server so that server never goes down on ssh logout or any
// other error, do npm install -g pm2 and them pm2 start server/indexedDB.js, pm2 kill for
//  ending pm2 process and pm2 list for listing pm2 processes

// 6. On each code change in server github repo , i have to pull all code install or build all npm
//  dependices and restart pm2 process again.
//This can be eased by writing a shell script file containing all the steps to run on each
// code change and just run this .sh file(source file.sh) on code change instaed of running all command

//aplied to
//retailready(y), vizzly(y),lugg(y),
// alacrity(l),mathgptpro(l), purecode.ai(l)
// great question(email)
//Wellfound- Vaya technologies, Entrupy, FleetOps, Maxim AI, Carbon Trail, MVPDevelopmentTeam
//Wellfound- Stochastic, Distill, Humantic AI, FLUXON,Trumio, berrybox, test rigor(r)
