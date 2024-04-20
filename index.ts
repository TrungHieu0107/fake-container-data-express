import express, { Express, Request, Response, Application } from 'express'
import dotenv from 'dotenv'
import { promises as fs } from 'fs'

export type Container = {
	id: string
	shipper_id: string
	shipper_name: string
	container_type: string
	product: string
	weight: number
	export_time: string
	estimated_delivery_time: string
	delivery_address: string
	house_number: string
	ward: string
	district: string
	province: string
	reciever_name: string
	reciever_phone: string
}

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Express & TypeScript Server')
})

app.get('/hello', (req: Request, res: Response) => {
	res.send('Welcome to Express & TypeScript Server hieu')
})

app.get('/api/containers', async (req: Request, res: Response) => {
	try {
		const file = await fs.readFile(process.cwd() + '/data/data.json', 'utf8')
		const data = JSON.parse(file) as Container[]
		return res.json(data).status(200)
	} catch (error) {
		console.log(error)
		return Response.json('')
	}
})

app.get('/api/containers/:id', async (req: Request, res: Response) => {
	try {
		const id: string = req.params.id || ''
		const file = await fs.readFile(process.cwd() + '/data/data.json', 'utf8')
      const list = JSON.parse(file) as Container[]
		const data = list.filter(
			(container) => container.id.toLowerCase() === id.toLowerCase()
		)
		return res.json(data).status(200)
	} catch (error) {
		console.log(error)
		return Response.json('')
	}
})

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`)
})
