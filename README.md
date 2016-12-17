# `SynonymsEditor` — A Synonyms Editor for Elasticsearch

This is a small AngularJS application that allows to generate a synonyms txt file for Elasticsearch based on a list of words and synonyms provided by the user.
The file should contain the result of analyze of each word and synonym with the german analyzer of Elasticsearch.

## German Analyzer Settings

Elasticsearch must have the german analyzer in order for this application to work :

You can find the settings for this [analyzer in Elasticsearch official website](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/analysis-lang-analyzer.html#german-analyzer).

## Access-Conrol-Allow-Origin

Add these lines at the end in "**elasticsearch.yml**" in the **config** folder of Elasticsearch in order to allow cross origin requests:
```
http.cors.enabled : true
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```

