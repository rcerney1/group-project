"""add category to products

Revision ID: 8e9cacf908ea
Revises: c99201006e17
Create Date: 2024-11-15 06:47:52.010749

"""
from alembic import op
import sqlalchemy as sa
import os

# Get environment and schema
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '8e9cacf908ea'
down_revision = 'c99201006e17'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('products', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.Integer(), nullable=False, server_default='1'))  # Default to 1

def downgrade():
    with op.batch_alter_table('products', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.drop_column('category')
