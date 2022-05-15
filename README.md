## About

This is a new challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges).  
I started this project to get familiar with Next.js but have realized Full Stack app would be more useful to explore Next.js to the best.

## Focused Features

1. User can search IP addresses / domains, see their key information
1. Resulted location will plot on the map (using lib - Mapbox)

## Takeaways

- Setup Github CI/CD in the beginning of the project.
- Deployed on Vercel & got to know an amazing feature - Automatic URLs  
  It is really easy to make a production deployment on Vercel. Learn more about it from [here](https://vercel.com/docs/concepts/deployments/automatic-urls)
- Since the public API we're using for gathering details contains 'address' keyword in its query parameter, thus getting blocked by Brave browser/ Ad-block extension users (restricts ad). Learnt a way to detect those extension before hitting the API to handle the Network error.

### Try it 👇

[Live Demo](https://ip-domain-tracker.vercel.app/ "IP-Tracker App")

## Suggestion

I want to initialize the app with IP Address of client's machine. Currently, you'll see the details of the server IP Address on which it's deployed, on the first load.  
Feel free to raise a PR. 😃

### 🔆 Build with Next.js + CSS Modules 🔆
