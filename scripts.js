function get_random_quote() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "quotes.txt",
            method: "GET",
            success: function (response) {
                var quotes = response.split("\n");
                var random_quote =
                    quotes[Math.floor(Math.random() * quotes.length)];
                resolve(random_quote);
            },
        });
    });
}

function get_random_poem() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "poems.json",
            method: "GET",
            success: function (response) {
                var poems =
                    typeof response === "string"
                        ? JSON.parse(response)
                        : response;

                var grouped = {};
                poems.forEach(function (poem) {
                    if (!grouped[poem.poet]) {
                        grouped[poem.poet] = [];
                    }
                    grouped[poem.poet].push(poem);
                });

                var poets = Object.keys(grouped);

                var randomPoet =
                    poets[Math.floor(Math.random() * poets.length)];

                var poetPoems = grouped[randomPoet];
                var randomPoem =
                    poetPoems[Math.floor(Math.random() * poetPoems.length)];

                resolve(randomPoem);
            },
            error: reject,
        });
    });
}

async function main() {
    var poem = await get_random_poem();

    var content = poem.content.trim();
    var lines = content.split("\n");

    var html = lines
        .map((line) => {
            var parts = line.split(" - ");
            return `<div class='pb1'>${parts[0]}</div>
                <div class='pb2'>${parts[1] || ""}</div>`;
        })
        .join("");

    $(".message").html(html);

    if (lines.length > 1) {
        $(".message").css("font-size", "70px");
    } else {
        $(".message").css("font-size", "80px");
    }

    $(".message").css("font-family", "nast");
    $(".message").css("margin-bottom", "180px");

    $(".message_container").css("background-image", "url(1.jpg)");

    setTimeout(function () {
        $(".message_container").css("opacity", "1");
    }, 300);
}

main();
