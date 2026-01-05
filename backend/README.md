Blog backend tailored to your frontend (from uploaded zip).

Key endpoints (match your frontend):
POST  /signUp          -> register (body: username, name, email, password)
POST  /login           -> login (body: email, password) -> returns { success:true, token }
POST  /uploadBlog      -> upload blog (form-data: title, desc, content, image, token)
POST  /getBlogs        -> get all blogs (body: { token? }) -> returns { success:true, blogs }
POST  /getBlog         -> get single blog (body: { blogId, token? })

Static uploads served at: http://localhost:3000/uploads/<filename>

Run:
1. copy .env.example to .env and set MONGO_URI and JWT_SECRET
2. npm install
3. npm start
