### Commands:
yarn - installs all the dependencies required for this project to run
yarn start - runs the app in the development mode 3000
yarn build - builds the app for production to the `build` folder
[Demo Link](https://truecaller-blog.netlify.com/)

### Assumptions:
1. I have tried to maintain the UI theme same as the original [truecaller blog](https://truecaller.blog/)
2. Related post api was returning 405 error which is caused because of headers missing at server side. As a result of this, I was unable to get the data required to showcase this functionality. The request was working with Postmam but failing everytime on browser. 
3. I have tried to make this web app reactive so that mobile view experience is good
4. I have set a request timeout of 5 secs for all the requests, so if server do not respond within this time, error is displayed on the page

### Features:
1. 25 posts are displayed on the main landing page
2. You can load older posts by cliking on button at the bottom of the page - it will append 25 older posts to the current page
3. There is a side bar on the right side of the page which shows 2 components - 1 to diplay all the categories and 1 more to display 10 most popular tags across all the posts.
4. You can click on any of the category list in side bar and it will display posts marked with the respective category
5. You can click on any of the Popular Tags list in side bar and it will display posts marked with the respective tag
6. You can see the individual post by by clicking on the header, post thumbnail or the Continue Reading button on the main landing page
