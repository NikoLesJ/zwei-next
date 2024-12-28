import Link from "next/link";

export const metadata = {
    title: "Blog me",
    description: "Blog page test data",
  };

  async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {
            revalidate: 60
        }
    })

    return response.json()
  }

const Blog = async () => {
    const posts = await getData()
    
  return (
    <div>
        <h1>Blog</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Blog