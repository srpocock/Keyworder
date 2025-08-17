type HistoryProps = { visible: boolean, guessedKeywords: string[], guessRelatedness: (number | Promise<number>)[] };

export default function History({ visible, guessedKeywords, guessRelatedness }: HistoryProps) {

    if (!visible) return null;

    return (
        <section className="history">
            <h2>Guess History</h2>
            <table aria-label="History of keyword guesses and their relatedness scores">
                <thead className="sr-only">
                    <tr>
                        <th scope="col">Keyword guess</th>
                        <th scope="col">Semantic relatedness score</th>
                    </tr>
                </thead>
                <tbody>
                    {guessedKeywords.map((keyword, index) => (
                        <tr key={index}>
                            <th scope="row">{keyword}</th>
                            <td>{guessRelatedness[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}