using Microsoft.Extensions.Options;
using server_side.Types;
using System.Collections.Specialized;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace server_side.Telegram.UserServices
{
    public class InitDataService : IInitDataService
    {
        private readonly TelegramBotConfiguration _botConfiguration;

        public InitDataService(IOptions<TelegramBotConfiguration> botConfiguration)
        {
            _botConfiguration = botConfiguration.Value;
        }

        public bool Validate(string initData) {
            if (!CheckInitDataPattern(initData)) {
                return false;
            }

            const string CONSTANT_KEY = "WebAppData";

            NameValueCollection query = HttpUtility.ParseQueryString(initData);

            SortedDictionary<string, string> queryDict = QueryToSortedDictionary(query);

            string dataCheckString = QueryDictionaryToString('\n', 
                queryDict, new string[] { InitDataKey.HASH });

            byte[] secretKey = HMACSHA256.HashData(Encoding.UTF8.GetBytes(CONSTANT_KEY),
                Encoding.UTF8.GetBytes(_botConfiguration.Token));

            byte[] generatedHash = HMACSHA256.HashData(secretKey,
                Encoding.UTF8.GetBytes(dataCheckString));

            byte[] actualHash = Convert.FromHexString(queryDict[InitDataKey.HASH]);
        
            return actualHash.SequenceEqual(generatedHash);
        }

        private SortedDictionary<string, string> QueryToSortedDictionary(NameValueCollection query) {
            SortedDictionary<string, string> result = new SortedDictionary<string, string>(
                query.AllKeys.ToDictionary(param => param!, param => query[param]!),
                StringComparer.Ordinal);

            return result;
        }

        private string QueryDictionaryToString(char separator,
                                               IDictionary<string, string> queryDict,
                                               string[] keysToExclude) {
            string result = string.Join(separator, queryDict
                .Where(param => !Array.Exists(keysToExclude, element => element == param.Key))
                .Select(x => $"{x.Key}={x.Value}"));

            return result;
        }

        private bool CheckInitDataPattern(string initData) {
            string pattern = @"query_id=.+&user=.+&auth_date=.+&hash=.+";
            Regex regex = new Regex(pattern);

            return regex.IsMatch(initData);
        }
    }
}
