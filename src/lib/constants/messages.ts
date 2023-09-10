export const w = ['Wrong answer', 'Try again', 'Not Quite', 'Think about it'];
export const r = [`That's right`, 'Excellent!', 'Way to go!'];

export const rm: {title: string; description: string;}[] = [
    {
        title: "Congratulations!",
        description: "You got it! Well done on finding the correct answer."
    },
    {
        title: "That's Correct!",
        description: "You've answered correctly. Great job!"
    },
    {
        title: "Excellent!",
        description: "You're doing excellent! Your answer is correct."
    },
    {
        title: "Well Played!",
        description: "Well played! Your answer is the correct one."
    },
    {
        title: "Awesome!",
        description: "Awesome job! Your answer is correct."
    }
]

export const wm: {title: string; description: string;}[] = [
    {
        title: "Oops!!",
        description: "It looks like your answer wasn't quite right."
    },
    {
        title: "Oops!! Wrong Answer",
        description: "It happens to the best of us! Your answer isn't quite right, but you're making progress."
    },
    {
        title: "Not quite right!",
        description: "Your answer is close, but not quite right!"
    },
    {
        title: "Try again",
        description: "It looks like your answer wasn't quite right. Give it another shot!"
    },
    {
        title: "Incorrect Answer",
        description: "Unfortunately, your answer is incorrect."
    }
];

export const message = (condition: boolean) => {
    return condition ? rm.getRandomElement() : wm.getRandomElement();
}