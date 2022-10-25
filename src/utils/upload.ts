interface UploadStatus {
	file: any
	filename?: string
	send: any
	opt?: {
		key: string
		contract: string
	}
}

const Upload = async ({ file, filename, send, opt }: UploadStatus) => {

	const slice = file.slice(0, 100000);

	const fileReader = new FileReader();

	fileReader.onload = async () => {
		const int8Array = new Uint8Array(fileReader.result as ArrayBuffer);

		const data = [] as Array<number>;

		int8Array.map((item: number) => {
			return data.push(item);
		});

		const res = await send("upload", filename, data, opt || {});

		console.log(res);
		return res;
	};

	fileReader.readAsArrayBuffer(slice);
}

export const getBuffer = () => { }

export default Upload;