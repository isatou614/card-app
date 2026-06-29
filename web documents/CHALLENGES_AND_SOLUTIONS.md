Challenges Encountered and Solutions

During the development and deployment of the CodeCards project, I faced several challenges. Although these issues delayed the deployment process, they helped me understand how full-stack web applications work and improved my problem-solving skills. Below are the major challenges I encountered and how I resolved them.

1. CORS Errors

One of the first challenges I encountered after deploying the application was that the frontend could not communicate with the backend. The browser kept blocking the requests because of Cross-Origin Resource Sharing (CORS) restrictions.

To solve this problem, I configured the CORS middleware in my Express backend and specified the exact URL of my frontend application in the environment variables. I also discovered that even a small mistake, such as adding a trailing slash to the URL, could prevent the connection from working.

This taught me the importance of configuring CORS correctly when deploying applications with separate frontend and backend services.

2. MongoDB Connection Problems

I experienced several issues while connecting my application to MongoDB Atlas.

The first issue was that MongoDB Atlas was blocking connections from Render because the IP address was not allowed. I solved this by adding 0.0.0.0/0 to the Network Access settings, which allows connections from any IP address while still requiring authentication.

The second issue was an incorrect MongoDB connection string. I had forgotten to include the database name, which prevented the application from connecting successfully. After correcting the connection string, the database connection worked properly.

I also discovered that my backend expected an environment variable called MONGODB_URI, while I had named it MONGODB_URL in Render. Renaming the variable solved the problem.

These challenges showed me that database configuration requires careful attention because even a small mistake can stop the application from working.

3. Express Trust Proxy Configuration

After deploying the backend on Render, I received an error related to Express not trusting the proxy server. Since Render uses a proxy to forward requests, Express needed to be configured accordingly.

I fixed this by adding the trust proxy setting in my Express application. After making this change, the backend handled incoming requests correctly.

From this experience, I learned that applications behave differently in production compared to running them locally.

4. Slow Response from Render

Another challenge was that the backend took a long time to respond whenever it had been inactive for some time. Initially, I thought the application was broken, but I later learned that this happens because the free version of Render temporarily puts applications to sleep when they are not in use.

The solution was simply to wait for about 30 to 60 seconds until the server became active again. Once it started, the application worked normally.

This helped me understand one of the limitations of free cloud hosting services.

5. Authentication Errors

While connecting to MongoDB Atlas, I mistakenly used my MongoDB Atlas account password instead of the database user’s password. As a result, the application could not authenticate with the database.

After checking the MongoDB Atlas dashboard, I found the correct database user credentials and updated the connection string. I also generated a new password to make future management easier.

This experience taught me the difference between account login credentials and database user credentials.

6. File Path Errors

Some pages in my frontend were unable to load JavaScript and CSS files after deployment. The browser displayed “404 File Not Found” errors because the file paths were incorrect.

I corrected the relative paths by moving one directory level up using ../. After updating the file paths, all the pages loaded successfully.

This reminded me to always verify file paths, especially when working with folders and subdirectories.

7. Port Conflict During Local Development

While testing the application locally, I initially configured the Express server to use port 5000, but it failed to start because another application was already using that port.

I changed the backend to use port 5001, updated the frontend API configuration, and the application ran successfully.

From this, I learned that port conflicts are common during development and can easily be resolved by selecting another available port.

8. MongoDB Installation

I also experienced difficulties installing MongoDB on my Mac because the Homebrew installation method was unsuccessful.

Instead of continuing with Homebrew, I downloaded the official MongoDB binary directly from the MongoDB website and installed it manually. After creating the required data directory, I was able to start the MongoDB server successfully.

This taught me that there is usually more than one way to install software, and it is important to explore alternative methods when the first approach does not work.

Lessons Learned

Working on this project helped me improve both my technical knowledge and my problem-solving skills. I learned that successful deployment involves much more than writing code. It requires careful configuration of databases, environment variables, hosting services, security settings, and application architecture.

Whenever I encountered an error, I learned to first check the error messages, review deployment logs, verify my environment variables, and consult the official documentation before making changes. Following a systematic troubleshooting process made it much easier to identify and solve problems.

Overall, this project gave me valuable hands-on experience with full-stack web development, cloud deployment, GitHub version control, MongoDB Atlas, Render, and Netlify. It also increased my confidence in debugging real-world applications and prepared me to handle similar challenges in future software development projects.