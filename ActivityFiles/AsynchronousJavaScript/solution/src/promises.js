// QuickLab 16b - Promises
export default function runPromise() {
    const aPromise = new Promise((resolve, reject) => {
        const delayedFunc = setTimeout(() => {
            //whether it resolves or rejects is unknown
            const randomNumber = Math.random();
            (randomNumber < 0.5) ? resolve(randomNumber) : reject(randomNumber);
        }, Math.random() * 5000); //function will return sometime: 0-5s
    });

    aPromise
        .then(
            //resolved
            data => {
                console.log(`Promise resolved with value ${data}`);
            },
        )
        .catch(
            //rejected
            error => {
                console.log(`Promise rejected with value ${error}`);
            }
        );
}
