var app = {
		
		send: () => {
			let date = new Date();
			
			$.ajax({
				url: "localhost:8080/take_my_date",
				data: { date },
				success: console.log,
				error: console.log
			});
		}
		
		
}
