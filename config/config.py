class Config(object):
    DEBUG = False
    TESTING = False
    ENV='development'

class ProductionConfig(Config):
    ENV='production'

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True