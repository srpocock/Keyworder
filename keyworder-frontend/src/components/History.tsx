type HistoryProps = { visible: boolean, guessedKeywords: string[] };

export default function History({ visible, guessedKeywords }: HistoryProps) {

    if (!visible) return null;

    return (
        <section className="history">
            <h2>Guess History</h2>
            <ul>
                {guessedKeywords.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                ))}
            </ul>
        </section>
    )
}