//This Generates COWSAY in console, can be used as easter egg in when uses clicks on Contact Us page.
class Easter {

    static QUOTES: string[] = [
        'Programmer: A machine that \nturns coffee into code.',
        'Computers are fast; \nprogrammers keep it slow.',
        'When I wrote this code, \nonly God and I understood what I did. \nNow only God knows.',
        'A son asked his father (a programmer) \nwhy the sun rises in the east, and sets in the west. \nHis response? It works, don’t touch!',
        'How many programmers does it take to change a light bulb? \nNone, that’s a hardware problem.',
        'Programming can be fun, and so can cryptography; \nhowever, they should not be combined.',
        'Copy-and-Paste was programmed by programmers \nfor programmers actually.',
        'Always code as if the person who ends up maintaining your code \nwill be a violent psychopath who knows where you live.',
        'Algorithm: Word used by programmers when \nthey don’t want to explain what they did.',
    ];

    //This methods generates cowsay in the console
    static COWSAY = () => {
        var randomNumber : number = Math.floor(Math.random() * this.QUOTES.length);
        var randomQuote : string = this.QUOTES[randomNumber];
        console.log("____________________________________________\n"+randomQuote+"\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||");
    };

}

export default Easter;