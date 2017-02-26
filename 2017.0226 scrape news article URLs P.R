###### DNA INFO: SCRAPE ARTICLE URLs MANUALLY BY NEIGHBORHOOD
articles.list <- list();
neighborhood <- 'lefferts+gardens'; # use + for space
page.max <- 63;
system.time(for(i in 1:page.max) {
  page.no <- i; 
  url <- paste0('https://www.dnainfo.com/new-york/search?q=%22', neighborhood, '%22+brooklyn%22&o=&p=', page.no);
  page <- read_html(url);
  links.raw <- html_attr(html_nodes(page, 'a'), 'href');
  links.articles <- unique(subset(links.raw, grepl('\\d', links.raw)));
  links.articles; length(links.articles);
  articles.list[[i]] <- links.articles}); 
articles.df <- data.frame(unlist(articles.list)); names(articles.df) <- 'url'; articles.df$neighborhood <- neighborhood;
neighborhood; page.max; nrow(articles.df);
write.csv(articles.df, paste0('articles_dnainfo_', neighborhood, '_', Sys.Date(), '_', format(Sys.time(), '%H-%M-%S'), '_n', nrow(articles.df), '.csv'), row.names = FALSE);

###### DNA INFO: MERGE NEIGHBORHOOD DATASETS INTO MASTER BROOKLYN DATASET
fnames <- list.files(); df.raw <- do.call(rbind.fill, lapply(fnames, read.csv)); 
df.ed <- subset(df.raw, select = c(neighborhood, url)); 
df.ed$url <- substr(as.character(df.ed$url), 3, nchar(as.character(df.ed$url)));
df.ed$ds <- sapply(strsplit(df.ed$url, '/'), function(x) x[3]);
df.ed$area <- sapply(strsplit(df.ed$url, '/'), function(x) x[4]);
df.ed$title.short <- sapply(strsplit(df.ed$url, '/'), function(x) x[5]); df.ed$title.short <- gsub('-', ' ', df.ed$title.short);
dnainfo.final <- df.ed;
write.csv(dnainfo.final, paste0('articles_dnainfo_',  Sys.Date(), '_', format(Sys.time(), '%H-%M-%S'), '_n', nrow(dnainfo.final), '.csv'), row.names = FALSE);

###### GOTHAMIST: SCRAPE ARTICLE URLs MANUALLY BY NEIGHBORHOOD
articles.list <- list();
neighborhood <- 'bergenbeach'; #no space
page.max <- 1;
system.time(for(i in 1:page.max) {
  page.no <- i; 
  url <- paste0('http://gothamist.com/tags/', neighborhood, '/', page.no);
  page <- read_html(url);
  links.raw <- html_attr(html_nodes(page, 'a'), 'href');
  links.articles.t1 <- unique(subset(links.raw, grepl(paste(c(paste0('^http://gothamist.com/', seq(2000, 2017, 1))), collapse = '|'), links.raw)));
  links.articles <- subset(links.articles.t1, grepl('.php$', links.articles.t1));
  links.articles; length(links.articles);
  articles.list[[i]] <- links.articles}); 
articles.df <- data.frame(unlist(articles.list)); names(articles.df) <- 'url'; articles.df$neighborhood <- neighborhood;
neighborhood; page.max; nrow(articles.df);
write.csv(articles.df, paste0('articles_gothamist_', neighborhood, '_', Sys.Date(), '_', format(Sys.time(), '%H-%M-%S'), '_n', nrow(articles.df), '.csv'), row.names = FALSE);

###### GOTHAMIST: MERGE NEIGHBORHOOD DATASETS INTO MASTER BROOKLYN DATASET
fnames <- list.files(); df.raw <- do.call(rbind.fill, lapply(fnames, read.csv)); 
df.ed <- subset(df.raw, select = c(neighborhood, url)); 
df.ed$url <- as.character(df.ed$url);
df.ed$ds <- paste0(sapply(strsplit(df.ed$url, '/'), function(x) x[4]), sapply(strsplit(df.ed$url, '/'), function(x) x[5]), sapply(strsplit(df.ed$url, '/'), function(x) x[6]));
df.ed$title.short <- sapply(strsplit(df.ed$url, '/'), function(x) x[7]); df.ed$title.short <- substr(df.ed$title.short, 1, nchar(df.ed$title.short)-4); df.ed$title.short <- gsub('_', ' ', df.ed$title.short);
gothamist.final <- df.ed;
write.csv(gothamist.final, paste0('articles_gothamist_', Sys.Date(), '_', format(Sys.time(), '%H-%M-%S'), '_n', nrow(gothamist.final), '.csv'), row.names = FALSE);