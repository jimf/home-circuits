import PropTypes from 'prop-types';

function tokenize(str, filterText) {
    if (filterText.trim() === '') {
        return [
            {
                type: 'non-matching-text',
                lexeme: str,
            },
        ];
    }

    const pattern = new RegExp(filterText, 'ig');
    const tokens = [];
    let lastIndex = 0;
    let match;

    // eslint-disable-next-line no-cond-assign
    while (match = pattern.exec(str)) {
        if (match.index > lastIndex) {
            tokens.push({
                type: 'non-matching-text',
                lexeme: str.substring(lastIndex, match.index),
            });
        }

        tokens.push({
            type: 'matching-text',
            lexeme: match[0],
        });

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < str.length) {
        tokens.push({
            type: 'non-matching-text',
            lexeme: str.substring(lastIndex),
        });
    }

    return tokens;
}

const FilterableText = ({ filterText, value }) => (
    <>
        {tokenize(value, filterText).map((token, idx) => {
            const Component = token.type === 'matching-text' ? 'mark' : 'span';
            return (
                <Component
                    key={token.type + token.lexeme + idx}
                >
                    {token.lexeme}
                </Component>
            )
        })}
    </>
);

FilterableText.propTypes = {
    filterText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default FilterableText;
