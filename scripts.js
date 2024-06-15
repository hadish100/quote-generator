function get_random_quote()
{
	return new Promise(function(resolve, reject)
	{
		$.ajax
		({
			url: 'quotes.txt',
			method: 'GET',
			success: function(response) 
			{
				var quotes = response.split("\n");
				var random_quote = quotes[Math.floor(Math.random() * quotes.length)];
				resolve(random_quote);
			}
		});
	});
}

function get_random_image()
{
	return new Promise(function(resolve, reject)
	{
		$.ajax
		({
			url: 'images.txt',
			method: 'GET',
			success: function(response) 
			{
				var images = response.split("\n");
				var random_image = images[Math.floor(Math.random() * images.length)];
				resolve(random_image);
			}
		});
	});
}

async function main()
{
	var quote = await get_random_quote();
	var image = await get_random_image();

	$('.message').text(quote);
	$(".message_container").css("background-image", "url(" + image + ")");

	setTimeout(function()
	{
		$(".message_container").css("opacity", "1");
	},300);
}

main()