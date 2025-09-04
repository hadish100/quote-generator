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

function get_random_poem()
{
	return new Promise(function(resolve, reject)
	{
		$.ajax
		({
			url: 'poems.txt',
			method: 'GET',
			success: function(response) 
			{
				var poems = response.split("\n");
				var random_poem = poems[Math.floor(Math.random() * poems.length)];
				resolve(random_poem);
			}
		});
	});
}

async function main()
{

	if(Math.random() > 0.5)
	{
		var quote = await get_random_quote();		
		$('.message').text(quote);
		$('.message').css("width","70%")
	}

	else
	{
		var poem = await get_random_poem();
		
		$('.message').html(`<div class='pb1'>${poem.split(" - ")[0]}</div><div class='pb2'>${poem.split(" - ")[1]}</div>`);
		$('.message').css("font-family","nast")
		$('.message').css("font-size","80px")
	}
	
	$('.message').css("margin-bottom","180px")
	$(".message_container").css("background-image", "url(1.jpg)");


	setTimeout(function()
	{
		$(".message_container").css("opacity", "1");
	},300);
}

main()